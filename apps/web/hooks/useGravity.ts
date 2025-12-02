import { useEffect, useRef, useState } from "react";

interface PhysicsObject {
  element: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  rotation: number;
  vr: number;
  isDragging: boolean;
  handleDown: (e: MouseEvent | TouchEvent) => void;
  mass: number;
}

interface UseGravityOptions {
  delay?: number;
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  floorBounce?: number;
  active?: boolean;
}

// Vector helper types
interface Vector {
  x: number;
  y: number;
}

export function useGravity(options: UseGravityOptions = {}) {
  const {
    delay = 2000,
    gravity = 0.5,
    friction = 0.99,
    wallBounce = 0.5,
    floorBounce = 0.5,
    active = true,
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const requestRef = useRef<number | undefined>(undefined);
  const objectsRef = useRef<PhysicsObject[]>([]);
  const dragRef = useRef<{
    obj: PhysicsObject | null;
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
    lastTime: number;
    moved: boolean;
  }>({
    obj: null,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    moved: false,
  });

  // --- Physics Math Helpers ---

  const getCorners = (obj: PhysicsObject): Vector[] => {
    const cx = obj.x + obj.width / 2;
    const cy = obj.y + obj.height / 2;
    const rad = (obj.rotation * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    const hw = obj.width / 2;
    const hh = obj.height / 2;

    return [
      { x: cx + (-hw * cos - -hh * sin), y: cy + (-hw * sin + -hh * cos) },
      { x: cx + (hw * cos - -hh * sin), y: cy + (hw * sin + -hh * cos) },
      { x: cx + (hw * cos - hh * sin), y: cy + (hw * sin + hh * cos) },
      { x: cx + (-hw * cos - hh * sin), y: cy + (-hw * sin + hh * cos) },
    ];
  };

  const getAxes = (corners: Vector[]): Vector[] => {
    const axes: Vector[] = [];
    for (let i = 0; i < corners.length; i++) {
      const p1 = corners[i];
      const p2 = corners[(i + 1) % corners.length];
      const edge = { x: p1.x - p2.x, y: p1.y - p2.y };
      // Normal vector
      const len = Math.sqrt(edge.x * edge.x + edge.y * edge.y);
      axes.push({ x: -edge.y / len, y: edge.x / len });
    }
    return axes;
  };

  const project = (corners: Vector[], axis: Vector) => {
    let min = Infinity;
    let max = -Infinity;
    for (const p of corners) {
      const dot = p.x * axis.x + p.y * axis.y;
      if (dot < min) min = dot;
      if (dot > max) max = dot;
    }
    return { min, max };
  };

  const checkCollision = (objA: PhysicsObject, objB: PhysicsObject) => {
    const cornersA = getCorners(objA);
    const cornersB = getCorners(objB);
    const axes = [...getAxes(cornersA), ...getAxes(cornersB)];

    let overlap = Infinity;
    let smallestAxis = { x: 0, y: 0 };

    for (const axis of axes) {
      const projA = project(cornersA, axis);
      const projB = project(cornersB, axis);

      if (projA.max < projB.min || projB.max < projA.min) {
        return null; // No collision
      }

      const axisOverlap =
        Math.min(projA.max, projB.max) - Math.max(projA.min, projB.min);
      if (axisOverlap < overlap) {
        overlap = axisOverlap;
        smallestAxis = axis;
      }
    }

    // Ensure smallestAxis points from A to B
    const cxA = objA.x + objA.width / 2;
    const cyA = objA.y + objA.height / 2;
    const cxB = objB.x + objB.width / 2;
    const cyB = objB.y + objB.height / 2;
    const dir = { x: cxB - cxA, y: cyB - cyA };
    if (dir.x * smallestAxis.x + dir.y * smallestAxis.y < 0) {
      smallestAxis = { x: -smallestAxis.x, y: -smallestAxis.y };
    }

    return { overlap, axis: smallestAxis };
  };

  const resolveCollision = (objA: PhysicsObject, objB: PhysicsObject) => {
    const collision = checkCollision(objA, objB);
    if (!collision) return;

    const { overlap, axis } = collision;

    // Separate objects
    const totalMass = objA.mass + objB.mass;
    const ratioA = objB.mass / totalMass;
    const ratioB = objA.mass / totalMass;

    if (objA.isDragging && !objB.isDragging) {
      objB.x += axis.x * overlap;
      objB.y += axis.y * overlap;
    } else if (!objA.isDragging && objB.isDragging) {
      objA.x -= axis.x * overlap;
      objA.y -= axis.y * overlap;
    } else if (!objA.isDragging && !objB.isDragging) {
      objA.x -= axis.x * overlap * ratioA;
      objA.y -= axis.y * overlap * ratioA;
      objB.x += axis.x * overlap * ratioB;
      objB.y += axis.y * overlap * ratioB;
    }

    // Exchange velocities
    const relVx = objB.vx - objA.vx;
    const relVy = objB.vy - objA.vy;
    const velAlongNormal = relVx * axis.x + relVy * axis.y;

    if (velAlongNormal > 0) return; // Moving apart

    const restitution = 0.2;
    let impulse = -(1 + restitution) * velAlongNormal;
    impulse /= 1 / objA.mass + 1 / objB.mass;

    if (!objA.isDragging) {
      objA.vx -= (impulse * axis.x) / objA.mass;
      objA.vy -= (impulse * axis.y) / objA.mass;
      objA.vx *= 0.95;
      objA.vy *= 0.95;
    }
    if (!objB.isDragging) {
      objB.vx += (impulse * axis.x) / objB.mass;
      objB.vy += (impulse * axis.y) / objB.mass;
      objB.vx *= 0.95;
      objB.vy *= 0.95;
    }
  };

  // --- End Helpers ---

  const getClientCoordinates = (e: MouseEvent | TouchEvent | Touch) => {
    if ("touches" in e) {
      const touch =
        (e as TouchEvent).touches[0] || (e as TouchEvent).changedTouches[0];
      return { clientX: touch.clientX, clientY: touch.clientY };
    }
    return {
      clientX: (e as MouseEvent).clientX,
      clientY: (e as MouseEvent).clientY,
    };
  };

  const handleInputDown = (
    e: MouseEvent | TouchEvent,
    element: HTMLElement
  ) => {
    if (e.type === "touchstart") {
      // Touch specific logic if needed
    }

    const { clientX, clientY } = getClientCoordinates(e);
    const obj = objectsRef.current.find((o) => o.element === element);

    if (obj) {
      obj.isDragging = true;
      obj.vx = 0;
      obj.vy = 0;
      dragRef.current = {
        obj,
        startX: clientX - obj.x,
        startY: clientY - obj.y,
        lastX: clientX,
        lastY: clientY,
        lastTime: performance.now(),
        moved: false,
      };
    }
  };

  const handleInputMove = (e: MouseEvent | TouchEvent) => {
    if (dragRef.current.obj) {
      const { clientX, clientY } = getClientCoordinates(e);
      const { obj, startX, startY, lastX, lastY, lastTime } = dragRef.current;

      const dx = clientX - lastX;
      const dy = clientY - lastY;

      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        dragRef.current.moved = true;
      }

      obj.x = clientX - startX;
      obj.y = clientY - startY;

      const now = performance.now();
      const dt = now - lastTime;
      if (dt > 0) {
        obj.vx = (dx / dt) * 15;
        obj.vy = (dy / dt) * 15;
      }

      dragRef.current.lastX = clientX;
      dragRef.current.lastY = clientY;
      dragRef.current.lastTime = now;
    }
  };

  const handleMouseMove = (e: MouseEvent) => handleInputMove(e);
  const handleTouchMove = (e: TouchEvent) => {
    if (dragRef.current.obj) {
      e.preventDefault();
    }
    handleInputMove(e);
  };

  const handleInputUp = () => {
    if (dragRef.current.obj) {
      dragRef.current.obj.isDragging = false;
      setTimeout(() => {
        dragRef.current.moved = false;
        dragRef.current.obj = null;
      }, 0);
    }
  };

  const handleMouseUp = () => handleInputUp();
  const handleTouchEnd = () => handleInputUp();

  const animate = () => {
    if (!containerRef.current) return;

    const containerHeight = containerRef.current.clientHeight;
    const containerWidth = containerRef.current.clientWidth;

    // 1. Apply forces & Move
    objectsRef.current.forEach((obj) => {
      if (obj.isDragging) {
        obj.element.style.transform = `translate(${obj.x}px, ${obj.y}px) rotate(${obj.rotation}deg)`;
        return;
      }

      obj.vy += gravity;
      obj.vx *= friction;
      obj.vy *= friction;
      obj.rotation += obj.vr;
      obj.vr *= 0.95;

      if (Math.abs(obj.vr) < 0.1) obj.vr = 0;
      if (Math.abs(obj.vx) < 0.1) obj.vx = 0;

      obj.x += obj.vx;
      obj.y += obj.vy;
    });

    // 2. Resolve Constraints (Walls)
    objectsRef.current.forEach((obj) => {
      if (obj.isDragging) return;

      const corners = getCorners(obj);
      let maxY = -Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let minX = Infinity;

      for (const p of corners) {
        if (p.y > maxY) maxY = p.y;
        if (p.y < minY) minY = p.y;
        if (p.x > maxX) maxX = p.x;
        if (p.x < minX) minX = p.x;
      }

      if (maxY > containerHeight) {
        obj.y -= maxY - containerHeight;
        obj.vy *= -floorBounce;
        obj.vx *= 0.8;
        obj.vr += obj.vx * 0.05;
      }
      if (minY < 0) {
        obj.y -= minY;
        obj.vy *= -floorBounce;
      }
      if (minX < 0) {
        obj.x -= minX;
        obj.vx *= -wallBounce;
        obj.vr -= obj.vy * 0.05;
      } else if (maxX > containerWidth) {
        obj.x -= maxX - containerWidth;
        obj.vx *= -wallBounce;
        obj.vr += obj.vy * 0.05;
      }
    });

    // 3. Resolve Object Collisions
    const iterations = 4;
    for (let i = 0; i < iterations; i++) {
      for (let j = 0; j < objectsRef.current.length; j++) {
        for (let k = j + 1; k < objectsRef.current.length; k++) {
          resolveCollision(objectsRef.current[j], objectsRef.current[k]);
        }
      }
      objectsRef.current.forEach((obj) => {
        const corners = getCorners(obj);
        let maxY = -Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let minX = Infinity;

        for (const p of corners) {
          if (p.y > maxY) maxY = p.y;
          if (p.y < minY) minY = p.y;
          if (p.x > maxX) maxX = p.x;
          if (p.x < minX) minX = p.x;
        }

        if (maxY > containerHeight) obj.y -= maxY - containerHeight;
        if (minY < 0) obj.y -= minY;
        if (minX < 0) obj.x -= minX;
        if (maxX > containerWidth) obj.x -= maxX - containerWidth;
      });
    }

    // 4. Render
    objectsRef.current.forEach((obj) => {
      obj.element.style.transform = `translate(${obj.x}px, ${obj.y}px) rotate(${obj.rotation}deg)`;
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  const initPhysics = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const children = Array.from(container.children) as HTMLElement[];
    const containerRect = container.getBoundingClientRect();

    const measurements = children.map((element) => {
      const rect = element.getBoundingClientRect();
      const x = rect.left - containerRect.left;
      const y = rect.top - containerRect.top;
      return { element, rect, x, y };
    });

    objectsRef.current = measurements.map(({ element, rect, x, y }) => {
      element.style.position = "absolute";
      element.style.left = "0";
      element.style.top = "0";
      element.style.width = `${rect.width}px`;
      element.style.height = `${rect.height}px`;
      element.style.transform = `translate(${x}px, ${y}px)`;
      element.style.zIndex = "10";
      element.style.touchAction = "none";

      const handleDown = (e: MouseEvent | TouchEvent) =>
        handleInputDown(e, element);
      element.addEventListener("mousedown", handleDown);
      element.addEventListener("touchstart", handleDown, { passive: false });

      element.ondragstart = () => false;

      element.addEventListener(
        "click",
        (e) => {
          if (dragRef.current.moved) {
            e.preventDefault();
            e.stopPropagation();
          }
        },
        true
      );

      return {
        element,
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: 0,
        width: rect.width,
        height: rect.height,
        rotation: 0,
        vr: (Math.random() - 0.5) * 0.2,
        isDragging: false,
        handleDown,
        mass: (rect.width * rect.height) / 1000,
      };
    });

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    setIsRunning(true);
    requestRef.current = requestAnimationFrame(animate);
  };

  const resetPhysics = () => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = undefined;
    }

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleTouchEnd);

    objectsRef.current.forEach((obj) => {
      // Remove Listeners
      obj.element.removeEventListener(
        "mousedown",
        obj.handleDown as EventListener
      );
      obj.element.removeEventListener(
        "touchstart",
        obj.handleDown as EventListener
      );

      // Reset Styles
      obj.element.style.position = "";
      obj.element.style.left = "";
      obj.element.style.top = "";
      obj.element.style.width = "";
      obj.element.style.height = "";
      obj.element.style.transform = "";
      obj.element.style.zIndex = "";
      obj.element.style.touchAction = "";
    });
    objectsRef.current = [];
    setIsRunning(false);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (active) {
      if (!isRunning) {
        timeoutId = setTimeout(() => {
          initPhysics();
        }, delay);
      }
    } else {
      resetPhysics();
    }

    return () => {
      clearTimeout(timeoutId);
      resetPhysics();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, delay]); // If active toggles, we reset or init.

  return { containerRef, isRunning };
}

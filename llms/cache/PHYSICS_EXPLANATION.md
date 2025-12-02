# Physics Engine Explanation (useGravity Hook)

This document explains the custom "vanilla JavaScript" physics engine implemented in the `useGravity` hook. It mimics the "Google Gravity" effect where DOM elements fall, bounce, collide, and can be thrown.

## 1. Initialization Phase

The physics engine works by taking standard DOM elements and "detaching" them from the document flow.

1.  **Measurement**: First, it measures the `getBoundingClientRect()` of every child element within the container to know their exact pixel position on screen.
2.  **Detachment**: It immediately switches their CSS `position` to `absolute` and sets their `transform` to `translate(x, y)` matching their original position.
    *   *Why?* This prevents layout shifts. If we didn't measure first, moving the first item to absolute would cause the second item to shift up, leading to incorrect starting positions.

## 2. The Physics Loop

The engine uses `requestAnimationFrame` to run a loop (approx 60fps). Each frame performs these steps:

1.  **Forces & Integration**: Apply gravity and velocity.
2.  **Constraint Resolution**: Keep objects inside the walls/floor.
3.  **Collision Resolution**: Handle object-to-object collisions.
4.  **Render**: Update the CSS `transform` of the elements.

### Forces
-   **Gravity**: Adds a constant value to vertical velocity (`vy`) every frame.
-   **Friction**: Multiplies velocity (`vx`, `vy`) by a factor (e.g., 0.99) to simulate air resistance.
-   **Rotational Drag**: Multiplies angular velocity (`vr`) by a factor (e.g., 0.95) to stop spinning over time.

## 3. Collision Detection (SAT)

Since the elements can **rotate**, we cannot use simple box collision (AABB). We use the **Separating Axis Theorem (SAT)**.

**Concept**: Two convex shapes are *not* colliding if you can find a line (axis) between them where their shadows (projections) do not overlap.

**Algorithm for Two Rectangles**:
1.  **Get Corners**: Calculate the (x, y) of all 4 corners for both rectangles, accounting for their current rotation.
2.  **Get Axes**: Get the "normal" vectors (perpendicular axes) for all 4 sides of both rectangles. (4 axes total for 2 rects).
3.  **Project**: Project all corners of Rect A and Rect B onto each axis.
4.  **Check Overlap**: If there is *any* axis where the projections do not overlap, they are not colliding. Return immediately.
5.  **Find Minimum Overlap**: If they overlap on *all* axes, they are colliding. The axis with the smallest overlap is the direction we need to push them apart to resolve the collision.

## 4. Collision Resolution

Once a collision is detected (and we know the "Minimum Translation Vector" or MTV):

1.  **Positional Correction**: We move the objects apart along the collision normal so they no longer overlap.
    *   We split the movement based on "mass" (approximated by area). Heavier objects move less; lighter objects move more.
2.  **Elastic Response (Bounce)**: We calculate the relative velocity along the normal.
    *   If they are moving towards each other, we apply an **impulse** to reverse their velocity, mimicking a bounce.
    *   The "bounciness" is controlled by a restitution coefficient (e.g., 0.2).

## 5. Stability Tricks

Physics engines built from scratch often "jitter" or explode. We use several tricks for stability:
-   **Iterations**: We run the collision resolution pass 4 times per frame. This helps propagate forces through a pile of objects.
-   **Sleep Thresholds**: If an object's velocity is very small (e.g., < 0.1), we snap it to 0 to stop micro-movements.
-   **Damping**: Strong rotational friction prevents objects from spinning endlessly like tops.

## 6. Interaction (Drag & Throw)

-   **Mouse/Touch**: We listen for `mousedown`/`touchstart`.
-   **Tracking**: When dragging, we disable physics forces on that specific object and directly map its position to the cursor.
-   **Throwing**: We track the position of the mouse over the last few frames. When released, we calculate the velocity (`distance / time`) and apply it to the object, effectively "throwing" it.


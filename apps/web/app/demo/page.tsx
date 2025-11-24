import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
} from "@heroui/react";

export default function HeroUIDemo() {
  return (
    <div className="p-8 md:p-12">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl md:text-8xl font-[900] tracking-tight">
            HeroUI Components
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Beautiful, fast, and modern React UI components
          </p>
        </div>

        {/* Buttons Section */}
        <section className="space-y-6">
          <h2 className="text-4xl">Buttons</h2>
          <Card>
            <CardBody>
              <div className="flex flex-wrap gap-4">
                <Button color="primary">Primary</Button>
                <Button color="secondary">Secondary</Button>
                <Button color="success">Success</Button>
                <Button color="warning">Warning</Button>
                <Button color="danger">Danger</Button>
                <Button variant="bordered">Bordered</Button>
                <Button variant="flat">Flat</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="light">Light</Button>
                <Button isLoading>Loading</Button>
                <Button isDisabled>Disabled</Button>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Chips Section */}
        <section className="space-y-6">
          <h2 className="text-4xl">Chips</h2>
          <Card>
            <CardBody>
              <div className="flex flex-wrap gap-4">
                <Chip color="primary">Primary</Chip>
                <Chip color="secondary">Secondary</Chip>
                <Chip color="success">Success</Chip>
                <Chip color="warning">Warning</Chip>
                <Chip color="danger">Danger</Chip>
                <Chip variant="bordered">Bordered</Chip>
                <Chip variant="flat">Flat</Chip>
                <Chip variant="dot">Dot</Chip>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Cards Section */}
        <section className="space-y-6">
          <h2 className="text-4xl">Cards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-2xl">Project Alpha</h3>
              </CardHeader>
              <Divider />
              <CardBody>
                <p className="text-slate-600 dark:text-slate-400">
                  A comprehensive redesign focusing on user experience and
                  modern aesthetics. This project demonstrates the power of
                  thoughtful design.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-2xl">Project Beta</h3>
              </CardHeader>
              <Divider />
              <CardBody>
                <p className="text-slate-600 dark:text-slate-400">
                  An exploration in minimalism and clarity. By stripping away
                  the unnecessary, we reveal what truly matters.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-2xl">Project Gamma</h3>
              </CardHeader>
              <Divider />
              <CardBody>
                <p className="text-slate-600 dark:text-slate-400">
                  Innovation through iteration. This project showcases how
                  continuous improvement leads to exceptional results.
                </p>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Button Sizes */}
        <section className="space-y-6">
          <h2 className="text-4xl">Button Sizes</h2>
          <Card>
            <CardBody>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm" color="primary">
                  Small
                </Button>
                <Button size="md" color="primary">
                  Medium
                </Button>
                <Button size="lg" color="primary">
                  Large
                </Button>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Radius Variants */}
        <section className="space-y-6">
          <h2 className="text-4xl">Border Radius</h2>
          <Card>
            <CardBody>
              <div className="flex flex-wrap gap-4">
                <Button radius="none" color="primary">
                  None
                </Button>
                <Button radius="sm" color="primary">
                  Small
                </Button>
                <Button radius="md" color="primary">
                  Medium
                </Button>
                <Button radius="lg" color="primary">
                  Large
                </Button>
                <Button radius="full" color="primary">
                  Full
                </Button>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Navigation */}
        <div className="flex justify-center gap-4 pt-8">
          <Button as={Link} href="/" color="primary" variant="shadow">
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `NavigiationItem`.
 */
export type NavigiationItemProps =
  SliceComponentProps<Content.NavigiationItemSlice>;

/**
 * Component for "NavigiationItem" Slices.
 */
const NavigiationItem = ({ slice }: NavigiationItemProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for navigiation_item (variation: {slice.variation})
      Slices
    </section>
  );
};

export default NavigiationItem;

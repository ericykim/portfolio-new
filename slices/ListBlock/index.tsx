import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ListBlock`.
 */
export type ListBlockProps = SliceComponentProps<Content.ListBlockSlice>;

/**
 * Component for "ListBlock" Slices.
 */
const ListBlock = ({ slice }: ListBlockProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for list_block (variation: {slice.variation}) Slices
    </section>
  );
};

export default ListBlock;

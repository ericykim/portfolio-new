// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismicT from "@prismicio/types";
import type * as prismic from "@prismicio/client";

type Simplify<T> = {
  [KeyType in keyof T]: T[KeyType];
};
/** Content for Navigation documents */
interface NavigationDocumentData {
  /**
   * Name field in *Navigation*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: navigation.name
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  name: prismicT.RichTextField;
  /**
   * Slice Zone field in *Navigation*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: navigation.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/slices
   *
   */
  slices: prismicT.SliceZone<NavigationDocumentDataSlicesSlice>;
}
/**
 * Slice for *Navigation → Slice Zone*
 *
 */
type NavigationDocumentDataSlicesSlice = NavigiationItemSlice;
/**
 * Navigation document from Prismic
 *
 * - **API ID**: `navigation`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type NavigationDocument<Lang extends string = string> =
  prismicT.PrismicDocumentWithUID<
    Simplify<NavigationDocumentData>,
    "navigation",
    Lang
  >;
/** Content for Page documents */
interface PageDocumentData {
  /**
   * date field in *Page*
   *
   * - **Field Type**: Timestamp
   * - **Placeholder**: *None*
   * - **API ID Path**: page.date
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/timestamp
   *
   */
  date: prismicT.TimestampField;
  /**
   * Title field in *Page*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: page.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  title: prismicT.RichTextField;
  /**
   * Slice Zone field in *Page*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: page.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/slices
   *
   */
  slices: prismicT.SliceZone<PageDocumentDataSlicesSlice>;
}
/**
 * Slice for *Page → Slice Zone*
 *
 */
type PageDocumentDataSlicesSlice = TextBlockSlice | ListBlockSlice;
/**
 * Page document from Prismic
 *
 * - **API ID**: `page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageDocument<Lang extends string = string> =
  prismicT.PrismicDocumentWithUID<Simplify<PageDocumentData>, "page", Lang>;
export type AllDocumentTypes = NavigationDocument | PageDocument;
/**
 * Primary content in ListBlock → Primary
 *
 */
interface ListBlockSliceDefaultPrimary {
  /**
   * title field in *ListBlock → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: list_block.primary.title
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  title: prismicT.RichTextField;
}
/**
 * Item in ListBlock → Items
 *
 */
export interface ListBlockSliceDefaultItem {
  /**
   * title field in *ListBlock → Items*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: list_block.items[].title
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  title: prismicT.RichTextField;
  /**
   * date field in *ListBlock → Items*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: list_block.items[].date
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  date: prismicT.KeyTextField;
  /**
   * subtext field in *ListBlock → Items*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: list_block.items[].subtext
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  subtext: prismicT.RichTextField;
  /**
   * link field in *ListBlock → Items*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: list_block.items[].link
   * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
   *
   */
  link: prismicT.LinkField;
}
/**
 * Default variation for ListBlock Slice
 *
 * - **API ID**: `default`
 * - **Description**: `Default`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ListBlockSliceDefault = prismicT.SharedSliceVariation<
  "default",
  Simplify<ListBlockSliceDefaultPrimary>,
  Simplify<ListBlockSliceDefaultItem>
>;
/**
 * Slice variation for *ListBlock*
 *
 */
type ListBlockSliceVariation = ListBlockSliceDefault;
/**
 * ListBlock Shared Slice
 *
 * - **API ID**: `list_block`
 * - **Description**: `ListBlock`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ListBlockSlice = prismicT.SharedSlice<
  "list_block",
  ListBlockSliceVariation
>;
/**
 * Primary content in NavigationItem → Primary
 *
 */
interface NavigiationItemSliceDefaultPrimary {
  /**
   * Name field in *NavigationItem → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: navigiation_item.primary.name
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  name: prismicT.RichTextField;
  /**
   * Link field in *NavigationItem → Primary*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: navigiation_item.primary.link
   * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
   *
   */
  link: prismicT.LinkField;
  /**
   * icon field in *NavigationItem → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: navigiation_item.primary.icon
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  icon: prismicT.ImageField<never>;
}
/**
 * Item in NavigationItem → Items
 *
 */
export interface NavigiationItemSliceDefaultItem {
  /**
   * Child Name field in *NavigationItem → Items*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: navigiation_item.items[].child_name
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  child_name: prismicT.RichTextField;
  /**
   * Child Link field in *NavigationItem → Items*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: navigiation_item.items[].child_link
   * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
   *
   */
  child_link: prismicT.LinkField;
  /**
   * icon field in *NavigationItem → Items*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: navigiation_item.items[].icon
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  icon: prismicT.ImageField<never>;
}
/**
 * Default variation for NavigationItem Slice
 *
 * - **API ID**: `default`
 * - **Description**: `Default`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type NavigiationItemSliceDefault = prismicT.SharedSliceVariation<
  "default",
  Simplify<NavigiationItemSliceDefaultPrimary>,
  Simplify<NavigiationItemSliceDefaultItem>
>;
/**
 * Slice variation for *NavigationItem*
 *
 */
type NavigiationItemSliceVariation = NavigiationItemSliceDefault;
/**
 * NavigationItem Shared Slice
 *
 * - **API ID**: `navigiation_item`
 * - **Description**: `NavigiationItem`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type NavigiationItemSlice = prismicT.SharedSlice<
  "navigiation_item",
  NavigiationItemSliceVariation
>;
/**
 * Primary content in TextBlock → Primary
 *
 */
interface TextBlockSliceDefaultPrimary {
  /**
   * title field in *TextBlock → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: text_block.primary.title
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  title: prismicT.RichTextField;
}
/**
 * Item in TextBlock → Items
 *
 */
export interface TextBlockSliceDefaultItem {
  /**
   * content field in *TextBlock → Items*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: text_block.items[].content
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  content: prismicT.RichTextField;
}
/**
 * Default variation for TextBlock Slice
 *
 * - **API ID**: `default`
 * - **Description**: `Default`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type TextBlockSliceDefault = prismicT.SharedSliceVariation<
  "default",
  Simplify<TextBlockSliceDefaultPrimary>,
  Simplify<TextBlockSliceDefaultItem>
>;
/**
 * Slice variation for *TextBlock*
 *
 */
type TextBlockSliceVariation = TextBlockSliceDefault;
/**
 * TextBlock Shared Slice
 *
 * - **API ID**: `text_block`
 * - **Description**: `TextBlock`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type TextBlockSlice = prismicT.SharedSlice<
  "text_block",
  TextBlockSliceVariation
>;
declare module "@prismicio/client" {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig
    ): prismic.Client<AllDocumentTypes>;
  }
  namespace Content {
    export type {
      NavigationDocumentData,
      NavigationDocumentDataSlicesSlice,
      NavigationDocument,
      PageDocumentData,
      PageDocumentDataSlicesSlice,
      PageDocument,
      AllDocumentTypes,
      ListBlockSliceDefaultPrimary,
      ListBlockSliceDefaultItem,
      ListBlockSliceDefault,
      ListBlockSliceVariation,
      ListBlockSlice,
      NavigiationItemSliceDefaultPrimary,
      NavigiationItemSliceDefaultItem,
      NavigiationItemSliceDefault,
      NavigiationItemSliceVariation,
      NavigiationItemSlice,
      TextBlockSliceDefaultPrimary,
      TextBlockSliceDefaultItem,
      TextBlockSliceDefault,
      TextBlockSliceVariation,
      TextBlockSlice,
    };
  }
}

import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.TINA_BRANCH || process.env.HEAD || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Page Content",
        path: "content/page",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "teamId", label: "Team ID" },
              { type: "string", name: "season", label: "Season" },
              { type: "string", name: "motto1", label: "Motto Word 1" },
              { type: "string", name: "motto2", label: "Motto Word 2" },
              { type: "string", name: "motto3", label: "Motto Word 3" },
              { type: "string", name: "title1", label: "Title Line 1" },
              { type: "string", name: "title2", label: "Title Line 2" },
              { type: "string", name: "subtitle", label: "Subtitle", ui: { component: "textarea" } },
              { type: "string", name: "ctaPrimary", label: "Primary CTA Text" },
              { type: "string", name: "ctaSecondary", label: "Secondary CTA Text" },
            ],
          },
          {
            type: "object",
            name: "about",
            label: "About Section",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow Text" },
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "paragraph1", label: "Paragraph 1", ui: { component: "textarea" } },
              { type: "string", name: "paragraph2", label: "Paragraph 2", ui: { component: "textarea" } },
              { type: "string", name: "paragraph3", label: "Paragraph 3", ui: { component: "textarea" } },
              {
                type: "object",
                name: "specs",
                label: "Spec Sheet",
                list: true,
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "value", label: "Value" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "values",
            label: "Mission & Values",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow Text" },
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "subheading", label: "Subheading", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Values",
                list: true,
                fields: [
                  { type: "string", name: "tag", label: "Tag" },
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "robot",
            label: "Our Robot",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow Text" },
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "subheading", label: "Subheading", ui: { component: "textarea" } },
              { type: "image", name: "image", label: "Robot Image" },
              {
                type: "object",
                name: "features",
                label: "Robot Features",
                list: true,
                fields: [
                  { type: "string", name: "tag", label: "Tag" },
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "contact",
            label: "Contact Section",
            fields: [
              { type: "string", name: "email", label: "Email" },
              { type: "string", name: "location", label: "Location" },
              { type: "string", name: "instagramUrl", label: "Instagram URL" },
              { type: "string", name: "formAction", label: "Form Action URL" },
            ],
          },
          {
            type: "object",
            name: "donate",
            label: "Donate / NPO Section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "orgName", label: "Organization Name" },
              { type: "string", name: "ein", label: "EIN" },
              { type: "string", name: "orgType", label: "Organization Type" },
              { type: "string", name: "mission", label: "Mission Statement", ui: { component: "textarea" } },
              { type: "string", name: "vision", label: "Vision", ui: { component: "textarea" } },
              { type: "image", name: "qrCode", label: "Zelle QR Code" },
              { type: "string", name: "zelleName", label: "Zelle Account Name" },
            ],
          },
        ],
      },
      {
        name: "teamMember",
        label: "Team Members",
        path: "content/team",
        format: "json",
        fields: [
          { type: "string", name: "name", label: "Name", required: true, isTitle: true },
          { type: "string", name: "role", label: "Role" },
          { type: "image", name: "photo", label: "Photo" },
          { type: "number", name: "order", label: "Display Order" },
        ],
      },
      {
        name: "timeline",
        label: "Timeline Events",
        path: "content/timeline",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Title", required: true, isTitle: true },
          { type: "string", name: "year", label: "Year / Period" },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
          { type: "number", name: "order", label: "Display Order" },
        ],
      },
      {
        name: "outreach",
        label: "Outreach Programs",
        path: "content/outreach",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Title", required: true, isTitle: true },
          { type: "string", name: "eyebrow", label: "Eyebrow Text" },
          { type: "string", name: "description1", label: "Description Paragraph 1", ui: { component: "textarea" } },
          { type: "string", name: "description2", label: "Description Paragraph 2", ui: { component: "textarea" } },
          {
            type: "string",
            name: "bullets",
            label: "Bullet Points",
            list: true,
          },
          {
            type: "object",
            name: "photos",
            label: "Photos",
            list: true,
            fields: [
              { type: "image", name: "src", label: "Image" },
              { type: "string", name: "alt", label: "Alt Text" },
            ],
          },
          { type: "number", name: "order", label: "Display Order" },
          { type: "boolean", name: "photosFirst", label: "Show Photos on Left Side" },
        ],
      },
      {
        name: "resource",
        label: "Resources",
        path: "content/resources",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Title", required: true, isTitle: true },
          { type: "string", name: "description", label: "Description" },
          { type: "string", name: "url", label: "URL" },
          { type: "number", name: "order", label: "Display Order" },
        ],
      },
      {
        name: "post",
        label: "Blog Posts",
        path: "content/posts",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Title", required: true, isTitle: true },
          { type: "datetime", name: "date", label: "Date" },
          { type: "string", name: "excerpt", label: "Excerpt", ui: { component: "textarea" } },
          { type: "image", name: "coverImage", label: "Cover Image" },
          { type: "string", name: "author", label: "Author" },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
      },
    ],
  },
});

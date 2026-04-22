import mongoose from "mongoose";

function slugify(value = "") {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    summary: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    liveUrl: {
      type: String,
      default: "",
    },
    githubUrl: {
      type: String,
      default: "",
    },
    caseStudyUrl: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "",
    },
    duration: {
      type: String,
      default: "",
    },
    techStack: {
      type: [String],
      default: [],
    },
    highlights: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

projectSchema.pre("validate", function (next) {
  if ((!this.slug || !this.slug.trim()) && this.title) {
    this.slug = slugify(this.title);
  } else if (this.slug) {
    this.slug = slugify(this.slug);
  }
  next();
});

export default mongoose.model("Project", projectSchema);

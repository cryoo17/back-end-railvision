import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v0.0.1",
    title: "Dokumentasi API Railvision",
    description: "Dokumentasi API Railvision",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local Server",
    },
    {
      url: "https://back-end-railvision.vercel.app/api",
      description: "Deploy Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      LoginRequest: {
        identifier: "azril",
        password: "Azril123",
      },
      RegisterRequest: {
        fullName: "Azril Januar",
        username: "azril",
        email: "azriljanuar@student.ub.ac.id",
        password: "Azril123",
        confirmPassword: "Azril123",
      },
      ActivationRequest: {
        code: "abcdef",
      },
      UpdateProfileRequest: {
        fullName: "",
        profilePicture: "",
      },
      UpdatePasswordRequest: {
        oldPassword: "",
        password: "",
        confirmPassword: "",
      },
      CreateCategoryRequest: {
        name: "",
        description: "",
        icon: "",
      },
      CreateStationRequest: {
        name: "Stasiun Purwokerto",
        slug: "stasiun-purwokerto",
        category: "681c3c25b27aca6495a595a5",
        description: "Description",
        location: {
          region: 3303070017,
          coordinates: [0.0, 0.0],
        },
        banner:
          "https://res.cloudinary.com/dwoalvumb/image/upload/v1746681061/ias9gsaxjkq3bxnxo2ql.png",
      },
      RemoveMediaRequest: {
        fileUrl: "",
      },
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFile = ["../routes/api.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFile, doc);

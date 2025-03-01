import { type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("auth", "./routes/auth.tsx"),
    route("food-drink", "./routes/food.tsx"),
    route("things-to-do", "./routes/entertainment.tsx"),
    route("where-to-stay", "./routes/hotel.tsx"),


] satisfies RouteConfig;

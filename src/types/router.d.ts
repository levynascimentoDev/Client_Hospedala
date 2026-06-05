import "vue-router"


declare module "vue-router" {
    interface RouteMeta {
        requireAuth?:boolean;
        requireNotAuth?:boolean;
        requireTokenAuthTemp?:"checkout" | "complete";
    }
}
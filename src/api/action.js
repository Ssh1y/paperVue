import service from "@/utils/axios";

export function RatePaper(data) {
    return service({
        url: "/user/rating",
        method: "post",
        data
    });
}
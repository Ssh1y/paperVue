import service from "@/utils/axios";

export function fetchRecommendPapers(data) {
  return service({
    url: "/paper/recommend",
    method: "post",
    data
  });
}

export function fetchPaperDetail(id) {
  return service({
    url: "/paper/detail",
    method: "get",
    params: { id }
  });
}

export function fetchSearchPapers(data) {
  return service({
    url: "/paper/search",
    method: "post",
    data
  });
}

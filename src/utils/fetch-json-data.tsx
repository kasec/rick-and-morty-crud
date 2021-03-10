export const fetchJSONData = function(url: string) {
  return fetch(url)
      .then(resp => resp.json())
      .catch(error => {throw "error [fetchJSONData] function => " + error})
}
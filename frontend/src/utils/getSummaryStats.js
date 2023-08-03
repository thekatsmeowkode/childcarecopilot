import * as d3 from "d3"

export const getSummaryStats = (data) => {
    const sortedData = data.sort(function(a, b){return a - b});
  
    const q1 = d3.quantile(sortedData, .25)
    const median = d3.quantile(sortedData, .5)
    const q3 = d3.quantile(sortedData, .75)
  
    if(!q3 || !q1 || !median){
        return
    }
  
    const interQuantileRange = q3 - q1
    let min = q1 - 1.5 * interQuantileRange
    const max = q3 + 1.5 * interQuantileRange
    if (min < 0) {min = 1}

    return {min, q1, median, q3, max}
  }
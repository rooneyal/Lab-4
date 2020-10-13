d3.csv('wealth-health-2014.csv', d3.autoType).then(data=>{
    console.log('wealth-health-2014.csv', data)

    data = data.sort((a,b)=>b.income-a.income);


const margin = {top:20, left:20, bottom:20, right:20};
const width = 400-margin.left- margin.right;
const height = 300-margin.top- margin.bottom;

const svg = d3.select('.chart').append('svg')
    .attr('width', width +margin.left +margin.right)
    .attr('height', height +margin.top +margin.bottom)
    .append('g')
    .attr('transform', 'translate('+margin.left+','+margin.right+')')

const xScale = d3.scaleLinear()
    .domain([d3.extent(data, d=>d.Income)])
    .range([0, width]);

const incomeMin = d3.min(data, d=>d.Income), 
      incomeMax = d3.max(data, d=>d.Income);

const incomeScale = d3.scaleLinear()
    .domain([incomeMin, incomeMax])
    .range([0, width]);

const xAxis = d3.axisBottom()
    .scale(incomeScale)
    .ticks(5, 's');
 
const colorScale = d3.scaleSequential(d3.interpolateBlues)
    .domain([incomeMin, incomeMax]);

svg.append('g')
    .attr("class", "axis x-axis")
    .call(xAxis);


svg.selectAll('.income')
    .data(data)
    .enter()
    .append('circle')
    .attr('fill', d=>colorScale(d.Income))
    .attr('class', 'income')
    .attr('stroke', 'black')
    .attr('r', 5)
    .attr('cy', height/2)
    .attr('cx', d=>incomeScale(d.Income));


})
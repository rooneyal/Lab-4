d3.csv('wealth-health-2014.csv', d3.autoType).then(data=>{
    console.log('wealth-health-2014.csv', data)

    data = data.sort((a,b)=>b.income-a.income);

const margin = {top:75, left:75, bottom:75, right:75};
const width = 700-margin.left- margin.right;
const height = 800-margin.top- margin.bottom;

const svg = d3.select('.chart').append('svg')
    .attr('width', width +margin.left +margin.right)
    .attr('height', height +margin.top +margin.bottom)
    .append('g')
    .attr('transform', 'translate('+margin.left+','+margin.top+')')

const incomeMin = d3.min(data, d=>d.Income), 
      incomeMax = d3.max(data, d=>d.Income);

const incomeScale = d3.scaleLinear()
    .domain([incomeMin, incomeMax])
    .range([0, width]);

const LifeExpectancyMin = d3.min(data, d=>d.LifeExpectancy), 
      LifeExpectancyMax = d3.max(data, d=>d.LifeExpectancy);

const LifeExpectancyScale = d3.scaleLinear()
  .domain([LifeExpectancyMin, LifeExpectancyMax])
  .range([0, width]);

const PopulationMin = d3.min(data, d=>d.Population), 
      PopulationMax = d3.max(data, d=>d.Population);

const PopulationScale = d3.scaleLinear()
.domain([PopulationMin, PopulationMax])
.range([6, 36]);


const xAxis = d3.axisBottom()
    .scale(incomeScale)
    .ticks(5, 's');
 
svg.append('g')
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

const yAxis = d3.axisLeft()
    .scale(LifeExpectancyScale)
    .ticks(5, 's');

svg.append('g')
    .attr("class", "axis y-axis")
    .attr("transform", `translate(0)`)
    .call(yAxis);

const colorScale = d3.scaleOrdinal([incomeMin, incomeMax])
    .range(d3.schemeTableau10);

svg.selectAll('.chart')
    .data(data)
    .enter()
    .append('circle')
    .attr('fill', d=>colorScale(d.Income))
    .attr('stroke', 'black')
    .attr('opacity', .8)
    .attr('r', d=>PopulationScale(d.Population))
    .attr('cy', d=>LifeExpectancyScale(d.LifeExpectancy))
    .attr('cx', d=>incomeScale(d.Income));


})
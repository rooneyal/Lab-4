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
    .range([margin.left, width]);

const LifeExpectancyMin = d3.min(data, d=>d.LifeExpectancy), 
      LifeExpectancyMax = d3.max(data, d=>d.LifeExpectancy);

const LifeExpectancyScale = d3.scaleLinear()
  .domain([LifeExpectancyMin, LifeExpectancyMax])
  .range([height - margin.top, 0]);

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
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(xAxis);

const yAxis = d3.axisLeft()
    .scale(LifeExpectancyScale)
    .ticks(5, 's');

svg.append('g')
    .attr("class", "axis y-axis")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(yAxis);

svg.append("text")
    .attr('x', width - margin.left - margin.right + 120)
    .attr('y', height + margin.top + margin.bottom - 230)
    .text("Income")
    .attr("font-weight", function(d,i) {
        return i * 100
    })
    .attr("font-size", "13px")

svg.append("text")
    .attr('x', width - margin.left - margin.right - 420)
    .attr('y', height - 740)
    .attr('text-anchor', 'font')
    .text("Life Expectancy")
    .attr("transform", d => "rotate(90)")
    .attr("font-size", "13px")
    .attr("font-weight", function(d,i) {
        return i * 100
    })


const colorScale = d3.scaleOrdinal([incomeMin, incomeMax])
    .range(d3.schemeTableau10);

svg.selectAll('.chart')
    .data(data)
    .enter()
    .append('circle')
    .attr('fill', d=>colorScale(d.Region))
    .attr('stroke', 'black')
    .attr('opacity', .8)
    .attr('r', d=>PopulationScale(d.Population))
    .attr('cy', d=>LifeExpectancyScale(d.LifeExpectancy))
    .attr('cx', d=>incomeScale(d.Income))
    
    .on("mouseenter", (event, d) => {
        const pos = d3.pointer(event, window);
        d3.select(".tooltip")
            .style('display', 'inline-block')
            .style('position', 'fixed')
            .style("background-color", "lightblue")
            .style("left", pos[0] + 40 + "px")
            .style("top", pos[1] + 40 + "px")
            .html(
                "Country: " + d.Country + "<br>" +
                "Region: " + d.Region + "<br>" +
                "Population: " + d.Population + "<br>" +
                "Income: " + d.Income + "<br>" +
                "Life Expectancy: " + d.LifeExpectancy)
        })

    .on("mouseleave", (event, d) => {
        d3.select('.tooltip')
            .style('display', 'none')
    });

const legend = svg.selectAll(".legend")
    .data(colorScale.domain())
    .enter()
    .append('rect')
    .attr('y', (d,i) => i * 24 + 407)
    .attr('x', 370)
    .attr("width", 15)
    .attr("height", 15)
    .attr('stroke', d=>colorScale(d))
    .attr('fill', d=>colorScale(d))

svg.selectAll("labels")
    .data(colorScale.domain())
    .enter()
    .append('text')
    .attr('y', (d,i) => i * 24 + 420)
    .attr('x', 400)
    .text(function(d) {
        return d;
    });

})
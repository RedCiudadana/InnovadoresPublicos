const moment = require("moment");
const now = new Date();
const rmj = require('render-markdown-js');

module.exports = function (eleventyConfig) {

    eleventyConfig.setTemplateFormats("njk,html,md");
    
    eleventyConfig.addPassthroughCopy('src');
    eleventyConfig.addPassthroughCopy('css');
    eleventyConfig.addPassthroughCopy('js');
    eleventyConfig.addPassthroughCopy('demos');
    eleventyConfig.addPassthroughCopy('elementos');
    eleventyConfig.addPassthroughCopy('images');
    eleventyConfig.addPassthroughCopy('admin');

    eleventyConfig.addPassthroughCopy({ 'netlify': '/' });

    eleventyConfig.addCollection('podcastsHighlighted', (collectionApi) => {
        return collectionApi.getFilteredByTag('podcasts').filter((item) => {
            return item.data.highlight == true;
        });
    });

    // FILTROS

    eleventyConfig.addNunjucksFilter("limit", function(array, limit) {
        return array.slice(0, limit);
    });

    eleventyConfig.addFilter("dateFormat", function(date, format) {
        return moment(date).format(format);
    });

    eleventyConfig.addNunjucksFilter("rmj", function (content) {
        return rmj(content);
    });
}

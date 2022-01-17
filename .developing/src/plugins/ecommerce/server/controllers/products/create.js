const slugify = require('slugify');
const randomIntFromInterval = require('../../utils/randomIntFromInterval');

module.exports = ({ strapi }) => async (ctx) => {
  const data = ctx.request.body;

  if (!data.name) {
    ctx.status = 400;
    ctx.body = `Field "name" required`;
    return
  }

  if (data.slug) {
    data.slug = slugify(data.slug)
  } else {
    data.slug = slugify(data.name)
  }

  const productsWithTheSameSlug = await strapi
    .query('plugin::ecommerce.product')
    .findOne({ where: { slug: data.slug } });
  if (productsWithTheSameSlug) {
    data.slug = data.slug + '-' + randomIntFromInterval(1000, 9999);
  }

  ctx.body = await strapi
    .query('plugin::ecommerce.product')
    .create({ data });
};

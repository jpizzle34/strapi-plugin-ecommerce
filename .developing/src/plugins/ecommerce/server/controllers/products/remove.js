module.exports = ({ strapi }) => async(ctx) => {
  const { id } = ctx.params
  ctx.body = await strapi
    .query('plugin::ecommerce.product')
    .delete({ where: { id } });
};

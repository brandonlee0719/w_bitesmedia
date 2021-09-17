var locals = require('../locals/index');
var knex = require('knex');

module.exports = {
  extends: 'apostrophe-blog',
  alias: 'articles',
  label: 'Article',
  pluralLabel: 'Articles',
  contextual: true,
  addFields: [
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'string'
    },
    {
      name: 'marqueeImage',
      label: 'Marquee Image',
      type: 'singleton',
      widgetType: 'apostrophe-images',
      options: {
        limit: 1
      }
    },
    {
      name: 'thumbnail',
      label: 'Thumbnail',
      type: 'singleton',
      widgetType: 'apostrophe-images',
      options: {
        limit: 1
      }
    },
    {
      name: 'ogDescription',
      label: 'Facebook Description',
      type: 'string',
      textarea: true
    },
    {
      name: '_categories',
      label: 'Categories',
      type: 'joinByArray',
      withType: 'category',
      idsField: 'categoryIds',
      filters: {
        projection: {
          slug: 1,
          title: 1,
          _url: 1
        }
      }
    }
  ],
  arrangeFields: [
    {
      name: 'basics',
      label: 'Basics',
      fields: ['title', 'subtitle', '_categories']
    },
    { name: 'images', label: 'Images', fields: ['marqueeImage', 'thumbnail'] },
    { name: 'social', label: 'Social', fields: ['ogDescription'] },
    {
      name: 'admin',
      label: 'Admin',
      fields: ['tags', 'slug', 'published', 'publicationDate']
    }
  ],
  construct: function(self, options) {
    self.addHelpers(locals)
    self.pushAsset('script', 'always', { when: 'always' })

    var knex = require('knex')({
      client: 'mysql',
      connection: {
        host: 'bites-user-analytics.cbmnlirdpkkw.us-east-1.rds.amazonaws.com',
        user: 'root',
        password: 'aldjBisKjDNQReN5j',
        database: 'bites_user_analytics'
      }
    })

    self.route('post', 'data/view', function(req, res) {
      var data = []
      try {
        var baseData = {
          user_id: req.body.user._id,
          user_username: req.body.user.title,
          article_id: req.body.article_id,
          article_title: req.body.article_title,
          article_slug: req.body.article_slug,
          href: req.body.href,
          timestamp: new Date()
        }

        if(req.body.blocks) {
            req.body.blocks.forEach(item => {
                var d = Object.assign(baseData, {})
                d['block_title'] = item.title
                d['block_id'] = item.id
                d['block_type'] = item.type
                d['block_px'] = parseInt(item.px)
                d['block_percent'] = parseInt(item.percent)
                d['block_seconds'] = parseInt(item.seconds)
                data.push(d)
            })
        }
      } catch (e) {
        console.log(e)
      }

      // insert into db
      return Promise.all(
        data.map(item => knex('bites_article_tracking').insert(item))
      )
        .then(response => {
          res.send(response)
        })
        .catch(e => {
          res.send(e)
          console.log(e)
        })
    })
  }
}

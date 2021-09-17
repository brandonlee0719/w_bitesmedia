module.exports = {
  extend: 'apostrophe-pieces',
  alias: 'polls',
  name: 'poll',
  label: 'Poll',
  pluralLabel: 'Polls',
  addFields: [
    {
      name: 'question',
      type: 'string',
      label: 'Question'
    },
    {
        name: 'optionA',
        type: 'string',
        label: 'Option A'
    },
    {
        name: 'optionB',
        type: 'string',
        label: 'Option B'
    },
    {
      name: 'path',
      type: 'string',
      label: 'Path (/:route/:slug)'
    }
  ]
};
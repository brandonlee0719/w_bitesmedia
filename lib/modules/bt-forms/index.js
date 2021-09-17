module.exports = {
  extend: 'apostrophe-pieces',
  alias: 'forms',
  name: 'forms',
  label: 'Assessment',
  puralLabel: 'Assessments',
  addFields: [
    {
      name: 'questions',
      label: 'Questions',
      type: 'array',
      titleField: 'prompt',
      schema: [
      	{
      		name: 'prompt',
      		type: 'string',
      		label: 'Prompt'
      	},
      	{
      		name: 'type',
      		type: 'select',
      		label: 'Question Type',
      		choices: [
      			{ 
      				label: 'Text Response',
      				value: 'text'
      			},
      			{
      				label: 'Multiple Choice',
      				value: 'choice',
      				showFields: ['choices']
      			}
      		]
      	},
      	{
      		name: 'choices',
      		type: 'array',
      		label: 'Choices',
      		titleField: 'option',
      		schema: [
      			{
      				name: 'option',
      				label: 'Option',
      				type: 'string'
      			}
      		]
      	}
    	]
    },
    {
      name: 'published',
      label: 'published',
      def: true,
      type: 'boolean'
    }
  ],
  arrangeFields: [
    { name: 'questions', label: 'Questions', fields: ['title', 'questions'] },
    { name: 'admin', label: 'Admin', fields: ['tags', 'slug', 'published'] }
  ]
};
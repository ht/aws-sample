

Ext.define('MyApp.model.MdInstanceInfo', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'instanceId'
        },
        {
            name: 'instanceState'
        },
        {
            name: 'placement'
        },
        {
            name: 'tag_name'
        },
        {
            name: 'privateIp'
        },
        {
            name: 'tag_type'
        },
        {
            name: 'vpcId'
        }
    ]
});
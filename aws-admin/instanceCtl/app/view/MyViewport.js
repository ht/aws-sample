

Ext.define('MyApp.view.MyViewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'MyApp.view.CpInstanceList',
        'MyApp.view.CpInstanceAct'
    ],

    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'cpinstancelist',
                    itemId: 'instanceList1',
                    region: 'center'
                },
                {
                    xtype: 'cpinstanceAct',
                    itemId: 'instanceAct1',
                    region: 'west'
                }
            ]
        });

        me.callParent(arguments);
    }

});
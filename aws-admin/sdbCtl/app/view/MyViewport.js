

Ext.define('MyApp.view.MyViewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'MyApp.view.CpInstanceAct',
        'MyApp.view.CpDomainList',
        'MyApp.view.CpTestList',
        'MyApp.view.CpDomainItemPanel'
    ],

    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'cpinstanceAct',
                    itemId: 'instanceAct1',
                    width: 250,
                    collapsed: false,
                    collapsible: true,
                    region: 'west'
                },
                {
                    xtype: 'cpdomainlist',
                    height: 448,
                    itemId: 'cpdomainlist1',
                    width: 10,
                    autoScroll: false,
                    region: 'center'
                },
                {
                    xtype: 'cptestlist',
                    hidden: true,
                    itemId: 'cptestlist1',
                    floatable: false,
                    region: 'center',
                    split: false
                },
                {
                    xtype: 'cpdomainitempanel',
                    hidden: true,
                    itemId: 'cpdmainitemlist3',
                    region: 'center'
                }
            ]
        });

        me.callParent(arguments);
    }

});
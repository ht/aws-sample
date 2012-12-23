
Ext.define('MyApp.view.CpDomainItemPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.cpdomainitempanel',

    requires: [
        'MyApp.view.CpDmainItemList',
        'MyApp.view.CpItemDetail'
    ],

    hidden: false,
    itemId: 'cpdmainitemlist2',
    layout: {
        type: 'border'
    },
    title: 'My Panel',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'cpdmainitemlist',
                    itemId: 'cpdmainitemlist1',
                    region: 'center'
                },
                {
                    xtype: 'cpitemdetail',
                    itemId: 'cpitemdetail1',
                    width: 300,
                    collapsed: true,
                    collapsible: true,
                    region: 'west'
                }
            ]
        });

        me.callParent(arguments);
    }

});
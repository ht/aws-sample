

Ext.define('MyApp.view.CpItemDetail', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.cpitemdetail',

    width: 436,
    layout: {
        type: 'fit'
    },
    title: '送信データ詳細',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textareafield',
                    itemId: 'itemdetailinfo',
                    fieldLabel: 'Label',
                    hideLabel: true
                }
            ]
        });

        me.callParent(arguments);
    }

});
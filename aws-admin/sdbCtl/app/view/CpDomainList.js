

Ext.define('MyApp.view.CpDomainList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.cpdomainlist',

    frame: true,
    height: 303,
    width: 456,
    resizable: true,
    closable: false,
    collapsed: false,
    collapsible: false,
    header: true,
    title: '一覧',
    forceFit: true,
    store: 'SDomainInfo',

    initComponent: function() {
        var me = this;

        me.addEvents(
            'evDomainItemDCL'
        );

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    width: 63,
                    dataIndex: 'domain',
                    text: 'domain'
                }
            ],
            viewConfig: {

            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    hidden: true,
                    items: [
                        {
                            xtype: 'button',
                            ctlTag: 'StopInstance',
                            text: '作成',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            ctlTag: 'StartInstance',
                            text: '削除',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick1,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            listeners: {
                itemdblclick: {
                    fn: me.onGridpanelItemDblClick,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick: function(button, e, options) {
        this.fnInstanceActionCall(button.ctlTag,null);

    },

    onButtonClick1: function(button, e, options) {
        this.fnInstanceActionCall(button.ctlTag,null);

    },

    onGridpanelItemDblClick: function(tablepanel, record, item, index, e, options) {
        this.fireEvent('evDomainItemDCL',record,true,tablepanel.ownerCt.itemid);

    }

});
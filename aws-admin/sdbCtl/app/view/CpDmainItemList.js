

Ext.define('MyApp.view.CpDmainItemList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.cpdmainitemlist',

    frame: true,
    height: 430,
    width: 456,
    resizable: true,
    closable: false,
    collapsed: false,
    collapsible: false,
    header: true,
    title: '一覧',
    store: 'SGmoregloggerInfo',

    initComponent: function() {
        var me = this;

        me.addEvents(
            'evLoadItemDetail'
        );

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    width: 41,
                    dataIndex: 'id',
                    text: 'id'
                },
                {
                    xtype: 'gridcolumn',
                    width: 44,
                    dataIndex: 'prefix',
                    text: 'prefix'
                },
                {
                    xtype: 'gridcolumn',
                    width: 44,
                    dataIndex: 'commodityid',
                    text: 'commodityid'
                },
                {
                    xtype: 'gridcolumn',
                    width: 53,
                    dataIndex: 'logtype',
                    text: 'logtype'
                },
                {
                    xtype: 'gridcolumn',
                    width: 63,
                    dataIndex: 'appkeyid',
                    text: 'appkeyid'
                },
                {
                    xtype: 'gridcolumn',
                    width: 110,
                    dataIndex: 'message',
                    text: 'msg'
                },
                {
                    xtype: 'gridcolumn',
                    width: 63,
                    dataIndex: 'timestamp',
                    text: 'timestamp'
                },
                {
                    xtype: 'gridcolumn',
                    width: 63,
                    dataIndex: 's3path',
                    text: 's3path'
                },
                {
                    xtype: 'gridcolumn',
                    width: 63,
                    dataIndex: 'confirmflg',
                    text: 'confirm'
                }
            ],
            viewConfig: {
                styleHtmlContent: false,
                autoScroll: false
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    hidden: false,
                    items: [
                        {
                            xtype: 'button',
                            ctlTag: 'StopInstance',
                            text: '確認',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick2,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            ctlTag: 'StopInstance',
                            text: '詳細',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick21,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'アーカイブ',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick11,
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

    onButtonClick2: function(button, e, options) {
        this.fnInstanceActionCall(button.ctlTag,null);

    },

    onButtonClick21: function(button, e, options) {
        this.fnItemDetailAction(button.ctlTag,null);

    },

    onButtonClick11: function(button, e, options) {
        this.fnInstanceActionCall(button.ctlTag,null);

    },

    onGridpanelItemDblClick: function(tablepanel, record, item, index, e, options) {
        this.fireEvent('evLoadItemDetail','test',true);
    },

    fnItemDetailAction: function() {
        this.fireEvent('evLoadItemDetail','test',null);
    }

});
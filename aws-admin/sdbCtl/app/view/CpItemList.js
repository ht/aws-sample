

Ext.define('MyApp.view.CpItemList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.cpitemlist',

    draggable: true,
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
    store: 'SGmoregloggerInfo',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    width: 63,
                    dataIndex: 'prefix',
                    text: 'commodityid'
                },
                {
                    xtype: 'gridcolumn',
                    width: 66,
                    dataIndex: 'logtype',
                    text: 'logtype'
                },
                {
                    xtype: 'gridcolumn',
                    width: 72,
                    dataIndex: 'appkeyid',
                    text: 'appkeyid'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'message',
                    text: 'message'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'data',
                    text: 'data'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'cpu',
                    text: 'logtime'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'confirmflg',
                    text: 'confirmflg'
                }
            ],
            viewConfig: {

            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            ctlTag: 'ViewItems',
                            text: '検索',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onButtonClick: function(button, e, options) {
        this.fnInstanceActionCall(button.ctlTag,null);

    },

    fnInstanceActionCall: function(acttype, value) {
        switch (acttype){
            case 'StartInstance':
            this.fireEvent('evStartInstance',value);
            break;
            case 'StopInstance':
            this.fireEvent('evStopInstance',value);
            break;
            case 'ViewInstance':
            this.fireEvent('evInstanceListRefresh',value);

            case 'DisableAutoRun':
            this.fireEvent('evDisableAutoRun',value);
            case 'DisableAutoRunTest':
            this.fireEvent('evDisableAutoRunTest',value);

            break;
        }
    }

});
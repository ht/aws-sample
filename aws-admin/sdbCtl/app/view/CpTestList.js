

Ext.define('MyApp.view.CpTestList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.cptestlist',

    draggable: true,
    frame: true,
    height: 430,
    width: 456,
    resizable: true,
    closable: false,
    collapsed: false,
    collapsible: false,
    header: true,
    title: '一覧',
    forceFit: true,
    store: 'MyJsonPStore2',

    initComponent: function() {
        var me = this;

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
                    width: 53,
                    dataIndex: 'Song',
                    text: 'song'
                },
                {
                    xtype: 'gridcolumn',
                    width: 63,
                    dataIndex: 'Rating',
                    text: 'rating'
                },
                {
                    xtype: 'gridcolumn',
                    width: 63,
                    dataIndex: 'Genre',
                    text: 'grane'
                },
                {
                    xtype: 'gridcolumn',
                    width: 63,
                    dataIndex: 'Artist',
                    text: 'artist'
                },
                {
                    xtype: 'gridcolumn',
                    width: 63,
                    dataIndex: 'Year',
                    text: 'year'
                }
            ],
            viewConfig: {
                styleHtmlContent: false,
                autoScroll: false
            }
        });

        me.callParent(arguments);
    }

});
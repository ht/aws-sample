/*
 * File: app/view/CpDmainItemList.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.CpDmainItemList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.cpdmainitemlist',

    frame: false,
    height: 430,
    width: 456,
    autoScroll: false,
    closable: false,
    collapsed: false,
    header: false,
    title: 'サ',
    store: 'SGmoregloggerInfo',

    initComponent: function() {
        var me = this;

        me.addEvents(
            'evLoadItemDetail',
            'evCheckConfirm',
            'evResendItem'
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
                            ctlTag: 'ResendItem',
                            text: 'DB再処理',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick211,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'passtext',
                            fieldLabel: 'Label',
                            hideLabel: true
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
        this.fnItemConfirmAction(button.ctlTag,null);

    },

    onButtonClick21: function(button, e, options) {
        this.fnItemDetailAction(button.ctlTag,null);

    },

    onButtonClick211: function(button, e, options) {
        this.fnResendItemAction(button.ctlTag,button.ownerCt.down('#passtext').value);

    },

    onGridpanelItemDblClick: function(tablepanel, record, item, index, e, options) {
        this.fireEvent('evLoadItemDetail','test',true);
    },

    fnItemDetailAction: function() {
        this.fireEvent('evLoadItemDetail','test',null);
    },

    fnItemConfirmAction: function() {
        this.fireEvent('evCheckConfirm','test',null);
    },

    fnResendItemAction: function(tag, pass) {
        this.fireEvent('evResendItem',pass);
    }

});
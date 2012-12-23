

Ext.define('MyApp.controller.CInstanceCtl', {
    extend: 'Ext.app.Controller',

    stores: [
        'SGmoregloggerInfo',
        'SDomainInfo',
        'MyJsonPStore2'
    ],
    views: [
        'CpDomainList',
        'CpInstanceAct',
        'CpDmainItemList',
        'CpTestList'
    ],

    refs: [
        {
            ref: 'instanceAct',
            selector: 'cpinstanceAct#instanceAct1'
        },
        {
            ref: 'dmlist',
            selector: 'cpdomainlist#cpdomainlist1'
        },
        {
            ref: 'dmitemlist',
            selector: 'cpdomainitempanel#cpdmainitemlist3'
        },
        {
            ref: 'testlist',
            selector: 'cptestlist#cptestlist1'
        }
    ],

    onPanelEvTabViewChange: function(newTab, hhh, eventOptions) {

        if(newTab.itemId==='iddomain'){
            this.getDmlist().show();
            this.getDmitemlist().hide();
            this.getTestlist().hide();

            this.getDmlist().store.load();

        }

        if(newTab.itemId==='iditem'){
            this.getDmlist().hide();
            //this.getDmitemlist().region= 'center';

            this.getDmitemlist().show();
            this.getTestlist().hide();

            //newTab.down('#dmview').store.load();

            this.getDmitemlist().down('#cpdmainitemlist1').store.load();

        }
        if(newTab.itemId==='idtest'){
            this.getDmlist().hide();
            this.getDmitemlist().hide();
            this.getTestlist().show();

            this.getTestlist().store.load();

        }

    },

    onPanelEvSearchData: function(type, cond, eventOptions) {
        if(type==='ViewItems'){
            var vStore = this.getDmitemlist().down('#cpdmainitemlist1').getStore();
            var vProxy = vStore.getProxy();

            //サーバに送信するパラメータを設定
            vProxy.extraParams = cond;
            vStore.load();

        }

        if(type==='ViewDomain'){
            var vStore = this.getDmlist().getStore();
            var vProxy = vStore.getProxy();

            //サーバに送信するパラメータを設定
            vProxy.extraParams = cond;
            vStore.load();

            //クリア
            var vStore = this.getDmitemlist().down('#cpdmainitemlist1').getStore();
            var vProxy = vStore.getProxy();

            //サーバに送信するパラメータを設定
            vProxy.extraParams = {'domain':'-'}
            vStore.load();    
        }
    },

    onPanelEvEditDomain: function(type, cond, eventOptions) {
        this.fnCallAWSAPI(type,cond);

    },

    onGridpanelEvLoadItemDetail: function(cond, dclick, eventOptions) {
        var imd = this.getDmitemlist().down('#cpitemdetail1');
        var gd = this.getDmitemlist().down('#cpdmainitemlist1');
        var sm = gd.getSelectionModel();
        var r = sm.getSelection();

        if(r.length>0){


            this.fnGetItemDetail(r[0].data.s3path,imd,dclick);
        }


    },

    onGridpanelEvDomainItemDCL: function(rec, dclick, id, eventOptions) {


        var _domain = rec.raw.domain;

        var cond = {region:this.getInstanceAct().ctlRegion, domain:_domain};




        var vStore = this.getDmitemlist().down('#cpdmainitemlist1').getStore();
        var vProxy = vStore.getProxy();

        //サーバに送信するパラメータを設定
        vProxy.extraParams = cond;
        vStore.load();
    },

    fnCallAWSAPI: function(typ, cond) {
        Ext.Msg.alert('sdb','ドメインを変更します。'+cond.region);

        if(typ===null | cond===null){

            Ext.Msg.alert('sdb','ドメインを指定してください。');
            return;

        }


        var data = {op:typ,region:cond.region,domain:cond.domain};


        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onreadystatechange = function()
        {
            var READYSTATE_COMPLETED = 4;
            var HTTP_STATUS_OK = 200;

            if( xmlHttpRequest.readyState == READYSTATE_COMPLETED && 
            xmlHttpRequest.status == HTTP_STATUS_OK )
            {
                // レスポンスの表示
                var obj = eval("(" + xmlHttpRequest.responseText + ')');
                if(obj.success){


                }
                else
                {
                    Ext.Msg.alert('ACPJ-AWS',obj);
                    return;

                }
            }
        };

        xmlHttpRequest.open( 'POST', '../modules/sdbRegDomain.php' );

        // サーバに対して解析方法を指定する
        xmlHttpRequest.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );

        // データをリクエスト ボディに含めて送信する
        xmlHttpRequest.send( this.EncodeHTMLForm( data ) );



    },

    EncodeHTMLForm: function(data) {

        var params = [];

        for( var name in data )
        {
            var value = data[ name ];
            var param = encodeURIComponent( name ).replace( /%20/g, '+' )
            + '=' + encodeURIComponent( value ).replace( /%20/g, '+' );

            params.push( param );
        }

        return params.join( '&' );

    },

    fnGetItemDetail: function(pathinfo, imd, dclick) {
        //Ext.Msg.alert('sdb','S3ファイルを取得します。'+pathinfo);


        imd.down('#itemdetailinfo').setValue('');


        var store = this.application.getStore('SItemDetail');
        var px = store.getProxy();
        px.extraParams = {s3path:pathinfo};

        store.load({scope:this,
            callback: function(records,success){
                if(success){
                    var rslt = records[0].raw.body;

                    imd.down('#itemdetailinfo').setValue(rslt);
                    if(dclick){
                        imd.setCollapsed(true);
                    }

                }
            }
        });



    },

    init: function(application) {
        this.control({
            "panel": {
                evTabViewChange: this.onPanelEvTabViewChange,
                evSearchData: this.onPanelEvSearchData,
                evEditDomain: this.onPanelEvEditDomain
            },
            "gridpanel": {
                evLoadItemDetail: this.onGridpanelEvLoadItemDetail,
                evDomainItemDCL: this.onGridpanelEvDomainItemDCL
            }
        });
    }

});

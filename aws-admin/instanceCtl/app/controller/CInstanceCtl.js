

Ext.define('MyApp.controller.CInstanceCtl', {
    extend: 'Ext.app.Controller',

    stores: [
        'SInstanceInfo'
    ],
    views: [
        'CpInstanceAct',
        'CpInstanceList'
    ],

    onPanelEvStartInstance: function(instanceId, eventOptions) {
        var insLst = Ext.ComponentQuery.query('#instanceList1')[0];
        var selRecords = insLst.getSelectionModel().getSelection();

        var id = selRecords[0].raw.instanceId;



        this.fnCallAWSAPI(id,'StartInstance');
    },

    onPanelEvStopInstance: function(instanceId, eventOptions) {
        var insLst = Ext.ComponentQuery.query('#instanceList1')[0];
        var selRecords = insLst.getSelectionModel().getSelection();

        var id = selRecords[0].raw.instanceId;

        var clbk = function(buttonId){
            if(buttonId != 'ok' )return;

            this.fnCallAWSAPI(id,'StopInstance');            

        };
        Ext.Msg.show({
            scope:this,
            title: 'ACPJ-AWS',
            msg: 'インスタンスを停止してもよろしいですか？',
            width: 300,
            buttons: Ext.Msg.OKCANCEL,
            fn:clbk,
            icon: Ext.window.MessageBox.INFO
        });



    },

    onPanelEvInstanceListRefresh: function(type, eventOptions) {
        var insLst = Ext.ComponentQuery.query('#instanceList1')[0];
        insLst.store.load();

        insLst.store.clearFilter();

        insLst.store.filter(function(r) {
            var tp = r.get('tag_type');

            if(type=='other')return (tp != 'release');


            return (tp == type);
        }
        );



    },

    fnCallAWSAPI: function(id, typ) {

        if(typ===null | id===null){

            Ext.Msg.alert('ACPJ','インスタンスを選択してください。');
            return;

        }


        var data = { CTLTYPE:typ, INSTANCEID:id }; // POSTリクエストで送信するデータ


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

        xmlHttpRequest.open( 'POST', '../modules/instanceCtl.php' );

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

    init: function(application) {
        this.control({
            "panel": {
                evStartInstance: this.onPanelEvStartInstance,
                evStopInstance: this.onPanelEvStopInstance,
                evInstanceListRefresh: this.onPanelEvInstanceListRefresh
            }
        });
    }

});

var common_ops = {
    buildUrl:function( path ,params ){
        var url = "" + path;
        var _paramUrl = "";
        if(  params ){
            _paramUrl = Object.keys( params ).map( function( k ){
                return [ encodeURIComponent( k ),encodeURIComponent( params[ k ] ) ].join("=");
            }).join("&");
            _paramUrl = "?" + _paramUrl;
        }
        return url + _paramUrl;
    },
    buildStaticUrl:function( imgUrl ){
        var domain = $("input[name=domain]").val();
        return domain + "static/"  + imgUrl;
    }
}
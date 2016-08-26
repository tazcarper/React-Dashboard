let helpers =  {
  formatPrice :  function(cents) {
    return '$ ' + ( (cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") );
  },
  truncateText : function(str, strLength){

    if (str.length > strLength)
      return str.substring(0,strLength).trim() +'...';
    else
      return str;
  },
  toThousands : function(num){
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  },
  parseTime: function(time){
    return Date.parse(time);
  }
}

export default helpers;

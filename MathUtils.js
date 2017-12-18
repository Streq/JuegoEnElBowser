Math.approach = function (val, target, amount){
    if(val==target) return;
    if(val<target) return Math.min(val+amount,target);
    return Math.max(val-amount,target);
};
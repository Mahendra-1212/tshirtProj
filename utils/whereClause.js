
class WhereClause{
    constructor(base,bigQ){
        this.base=base;
        this.bigQ=bigQ;
    }

    search(){debugger;
        const searchWord=this.bigQ.search?{
            name:{
                $regex:this.bigQ.search,
                $options:'i'
            }
        }:{}
        this.base=this.base.find({...searchWord});
        return this;
    }


    pager(resultPerPage){debugger;
        let pageLimit=1;
        if(this.bigQ.page){
            pageLimit=this.bigQ.page;
        }
      const skipval=resultPerPage*(pageLimit-1);
      this.base=this.base.limit(resultPerPage).skip(skipval);
    }

    filter(){debugger;
        const copyQ={...this.bigQ};

        delete copyQ["search"];
        delete copyQ["limit"];
        delete copyQ["page"];

        let stringofCopyQ=JSON.stringify(copyQ);
        stringofCopyQ=stringofCopyQ.replace(/\b(gte|lte|gt|lt)\b/g,m=>{`$${m}`});
        const jsonOfCopyQ=JSON.parse(stringofCopyQ);
        this.base=this.base.find(jsonOfCopyQ);
        return this;
    }

}

module.exports=WhereClause;
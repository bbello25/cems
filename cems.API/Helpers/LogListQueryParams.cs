using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cems.API.Helpers
{
    public class LogListQueryParams : QueryParams
    {
        //filtering
        public double TimeValue { get; set; } = 1;
        public string TimeUnits { get; set; } = "d";
        public bool IncludeBody { get; set; } = false;
    }
}

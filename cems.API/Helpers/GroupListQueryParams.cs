using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cems.API.Models;

namespace cems.API.Helpers
{
    public class GroupListQueryParams : QueryParams
    {
        public GroupingReason? GroupingReason { get; set; }
    }
}

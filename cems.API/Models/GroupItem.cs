using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cems.API.Models
{
    public class GroupItem
    {
        public CemsLog CemsLog {get; set; }
        public int CemsLogId { get; set; }

        public Group Group { get; set; }
        public int GroupId { get; set; }

    }
}

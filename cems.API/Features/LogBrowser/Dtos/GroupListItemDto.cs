using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cems.API.Models;

namespace cems.API.Features.LogBrowser.Dtos
{
    public class GroupListItemDto
    {
        public int Id { get; set; }
        public GroupingReason GroupingReason { get; set; }
        public string GroupingContext { get; set; }
        public DateTime FirstOccured { get; set; }
        public DateTime LastOccured { get; set; }
        public int LogsCount { get; set; }

        public LogHeaderDto LastLogHeader { get; set; }

    }
}

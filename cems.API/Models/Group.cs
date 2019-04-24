using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cems.API.Models.identity;

namespace cems.API.Models
{
    public class Group
    {
        public int Id { get; set; }
        public GroupingReason GroupingReason { get; set; }
        public string GroupingContext { get; set; }
        public DateTime FirstOccured { get; set; }
        public DateTime LastOccured { get; set; }
        public Platforms Platform { get; set; }

        public ICollection<GroupItem> GroupItems { get; set; }
        public User Owner { get; set; }
        public int OwnerId { get; set; }
    }

    public enum GroupingReason
    {
        SameStackTrace = 0,
        SameLastStackFrame = 1,
        SameControllerAction = 2,
        SameSession = 3
    }
}
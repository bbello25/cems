using System;

namespace cems.API.Helpers
{
    public class QueryParams
    {
        // paging
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
        }

        //filtering
        public double TimeValue { get; set; } = 1;
        public string TimeUnits { get; set; } = "d";

        //sorting
        public string OrderBy { get; set; }
    }
}
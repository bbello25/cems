using System;
using System.Collections;
using System.Collections.Generic;

namespace cems.API.Helpers
{
    public class QueryParams
    {
        // paging
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int m_pageSize = 10;

        public int PageSize
        {
            get => m_pageSize;
            set => m_pageSize = value > MaxPageSize ? MaxPageSize : value;
        }

        public string OrderBy { get; set; }
        public string OrderByDirection { get; set; }
        public ICollection<string> Filter { get; set; }

    }
}
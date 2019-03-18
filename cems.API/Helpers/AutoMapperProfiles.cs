using System;
using AutoMapper;
using cems.API.Features.Authorization;
using cems.API.Features.LogEndpoint;
using cems.API.Features.Users;
using cems.API.Models;

namespace cems.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public class DateTimeTypeConverter : ITypeConverter<string, DateTime>
        {
            public DateTime Convert(string source, DateTime destination, ResolutionContext context)
            {
                return System.Convert.ToDateTime(source);
            }
        }

        public AutoMapperProfiles()
        {
            CreateMap<string, DateTime>().ConvertUsing(new DateTimeTypeConverter());

            //Endpoint mappings
            CreateMap<BrowserErrorForSaveDto, BrowserErrorLog>();
            CreateMap<ErrorForSaveBaseDto, BrowserErrorLog>();

            CreateMap<User, UserForListDto>();
//            CreateMap<BaseErrorLog, LogEntryForListDto>();
            CreateMap<User, UserDetailDto>();
            CreateMap<UserDetailDto, User>();
            CreateMap<UserForRegisterDto, User>();
        }
    }
}
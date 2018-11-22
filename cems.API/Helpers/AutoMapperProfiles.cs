using System;
using System.Collections.Generic;
using AutoMapper;
using cems.API.Dtos;
using cems.API.Dtos.EndpointDTOs;
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

            CreateMap<User, UserForListDTO>();
            CreateMap<ErrorLogBase, LogEntryForListDTO>();
            CreateMap<User, UserForDetailedDTO>();
            CreateMap<UserForDetailedDTO, User>();
            CreateMap<UserForRegisterDto, User>();
        }
    }
}
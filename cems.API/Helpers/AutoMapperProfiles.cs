using System.Collections.Generic;
using AutoMapper;
using cems.API.Dtos;
using cems.API.Models;

namespace cems.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDTO>();
            CreateMap<LogEntry, LogEntryForListDTO>();
            CreateMap<User, UserForDetailedDTO>();
            CreateMap<UserForRegisterDTO, User>();
        }
    }
}
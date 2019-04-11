FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 AS base
FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build
#FROM microsoft/dotnet
COPY . /app
WORKDIR /app
RUN ["dotnet", "restore"]
RUN ["dotnet", "build"]
EXPOSE 5000/tcp
ENV ASPNETCORE_URLS http://*:5000
ENV ASPNETCORE_ENVIRONMENT Production
RUN chmod +x ./entrypoint.sh
CMD /bin/bash ./entrypoint.sh
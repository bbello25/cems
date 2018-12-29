#FROM microsoft/dotnet:2.1.5-aspnetcore-runtime AS base
#
#FROM microsoft/dotnet:2.1.403-sdk AS build
FROM microsoft/dotnet
COPY . /app
WORKDIR /app
RUN ["dotnet", "restore"]
RUN ["dotnet", "build"]
EXPOSE 5000/tcp
ENV ASPNETCORE_URLS http://*:5000
ENV ASPNETCORE_ENVIRONMENT Production
RUN chmod +x ./entrypoint.sh
CMD /bin/bash ./entrypoint.sh
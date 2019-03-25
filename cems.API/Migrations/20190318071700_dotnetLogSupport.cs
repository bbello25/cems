using Microsoft.EntityFrameworkCore.Migrations;

namespace cems.API.Migrations
{
    public partial class dotnetLogSupport : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ConnectionInfoJson",
                table: "ErrorLog",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Host",
                table: "ErrorLog",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Port",
                table: "ErrorLog",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RequestJson",
                table: "ErrorLog",
                nullable: true);

            migrationBuilder.RenameColumn(
                name: "StackTrace",
                table: "ErrorLog",
                newName: "StackTraceJson");

            migrationBuilder.RenameColumn(
                name: "Message",
                table: "ErrorLog",
                newName: "ExceptionMessage");
            
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConnectionInfoJson",
                table: "ErrorLog");

            migrationBuilder.DropColumn(
                name: "Host",
                table: "ErrorLog");

            migrationBuilder.DropColumn(
                name: "Port",
                table: "ErrorLog");

            migrationBuilder.DropColumn(
                name: "RequestJson",
                table: "ErrorLog");

            migrationBuilder.RenameColumn(
                name: "StackTraceJson",
                table: "ErrorLog",
                newName: "StackTrace");

            migrationBuilder.RenameColumn(
                name: "ExceptionMessage",
                table: "ErrorLog",
                newName: "Message");
        }
    }
}

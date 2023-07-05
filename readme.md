# WEB-DOS-BLOG



### Welcome to the WEB DOS BLOG project.

This project aims to provide developers with a framework that allows them to make (dos/terminal)-themed applications.

My purpose is to create a blog with the style of a DOS Computer connected to the internet. (I know... boujee.)

## WEB-DOS-FEATURES

As of now a simple markdown engine is available that can handle headers and quotes. It's under the `TextEngine` namespace. 

#### Usage:
```dd
#Header
##SubHeader
>Quote Text
Regular Text
```


### Commands
Commands are available to be both added and executed, and in the future SYSTEM PATHS will be implemented if the developer decides they want to use that. 

### Arguments

Simple argument parsing is available as well, although it's not in the best shape and it could use a much better refining, it gets the job done for `cd`...

### File Structure
The entire application has a psuedo-file system. In code, this is the `FileStructure` object, and one should be present in the entire app(although multiple drive support may be available soon).

Objects that play a significant role in `FileStructure` is the `Directory` and `File` Objects. They both  represent their names, directories can store other directories and files and files can be executed. 

As of now, everything that can be executed returns a string for the DOS Prompt to print. In the future this may change, as the response may be a generic interface that contains a return value and other important information.


### Navigation
There is a robust navigation system in-place that works similarly to how it does in DOS and Unix environments. As of now, all of the paths require a `/` instead of the typical Windows/DOS path `\`. Later into development, an option will be available to switch this behavior if the developer chooses so.

`cd` works as well, navigating to a directory from the root like : `/home/blogs/`. Or going to a irrelevant directory like `/home/blogs --> /var`.
module Viewit
  class DataItem
    def initialize input = nil
      case input
      when nil
        EmptyData.new input
      when Fixnum, String
        LiteralData.new input
      when Array
        ArrayData.new input
      when Hash
        HashData.new input
      else
        raise "Not supported: #{input.inspect}"
      end
    end
    
    # Special data item class for nil
    class EmptyData < DataItem
      def initialize input
      end
    end
    
    # number/string/...
    class LiteralData < DataItem
      def initialize input
      end
    end
    
    # hash data
    class HashData < DataItem
      def initialize input
      end
    end
    
    # array
    class ArrayData < DataItem
      def initialize input
      end
    end
  end
end
